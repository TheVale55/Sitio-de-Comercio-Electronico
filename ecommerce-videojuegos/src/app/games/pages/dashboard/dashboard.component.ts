import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  activeTab: string = 'topProducts'; // Tab activa por defecto
  
  constructor(private gameService: GamesService) {
    Chart.register(...registerables); // Registra los componentes de Chart.js
  }

  ngOnInit(): void {
    this.renderTopProductsChart();
    this.renderActiveUsersChart();
    this.renderDailyOrdersChart();
  }

  // Cambia la pestaña activa
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    setTimeout(() => {
      // Renderiza los gráficos nuevamente al cambiar la pestaña
      if (tab === 'topProducts') this.renderTopProductsChart();
      if (tab === 'activeUsers') this.renderActiveUsersChart();
      if (tab === 'dailyOrders') this.renderDailyOrdersChart();
    }, 100); // Delay para asegurar que el elemento canvas esté disponible
  }

  // Gráfico de Productos más Vendidos
  renderTopProductsChart(): void {
    const ctx = document.getElementById('topProductsChart') as HTMLCanvasElement;
    if (!ctx) return; // Evita errores si el canvas no está disponible
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Game A', 'Game B', 'Game C', 'Game D', 'Game E'],
        datasets: [
          {
            label: 'Units Sold',
            data: [120, 150, 90, 60, 200],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Top Selling Products' },
        },
      },
    });
  }

  // Gráfico de Usuarios Activos
  renderActiveUsersChart(): void {
    const ctx = document.getElementById('activeUsersChart') as HTMLCanvasElement;
    if (!ctx) return; // Evita errores si el canvas no está disponible
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Active Users',
            data: [50, 80, 100, 75, 90, 130, 150],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Active Users by Day' },
        },
      },
    });
  }

  // Gráfico de Pedidos Diarios
  renderDailyOrdersChart(): void {
    const ctx = document.getElementById('dailyOrdersChart') as HTMLCanvasElement;
    if (!ctx) return; // Evita errores si el canvas no está disponible
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['01/11', '02/11', '03/11', '04/11', '05/11', '06/11', '07/11'],
        datasets: [
          {
            label: 'Orders Placed',
            data: [20, 40, 35, 50, 60, 80, 90],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Daily Orders' },
        },
      },
    });
  }

  setSales(): void {
    this.gameService.setSales().subscribe();
  }
}
